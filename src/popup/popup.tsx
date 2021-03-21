import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  SectionList,
  SectionListRenderItem,
  SectionListData,
  CheckBox,
} from "react-native-web";
import { badgesList } from "../data/badgesList";
import { isBadgeSelected } from "../utils/isBadgeSelected";
import { selectBadge } from "../utils/selectBadge";
import { unselectBadge } from "../utils/unselectBadge";

export interface SectionItemProp {
  name: string;
  key: string;
  url: string;
}

export interface SectionDataProp {
  title: string;
  data: SectionItemProp[];
}

const sectionNames = Object.keys(badgesList);

const sectionData: SectionDataProp[] = sectionNames.map((key) => {
  return {
    title: key,
    data: Object.keys(
      // @ts-ignore
      badgesList[key] as { key: { name: string; url: string } }
    ).map((itemKey) => {
      return {
        key: itemKey,
        // @ts-ignore
        ...(badgesList[key][itemKey] as { name: string; url: string }),
      };
    }),
  };
});

const ItemComponent: FC<{ item: SectionItemProp }> = ({ item }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    isBadgeSelected(item.key)
      .then((result) => setIsSelected(result))
      .catch(() => null);
  }, []);

  const toggleSelect = () => {
    if (!isSelected) {
      selectBadge(item.key)
        .then(() => setIsSelected(true))
        .catch(() => null);
    } else {
      unselectBadge(item.key)
        .then(() => setIsSelected(false))
        .catch(() => null);
    }
  };

  return (
    <View
      style={{
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <CheckBox value={isSelected} onChange={toggleSelect} />
      <Text onPress={toggleSelect} style={{ fontSize: 16, paddingLeft: 16 }}>
        {item.name}
      </Text>
    </View>
  );
};

const SectionItem: SectionListRenderItem<SectionItemProp, SectionDataProp> = ({
  item,
}) => {
  return <ItemComponent item={item} />;
};

const SectionHeader: (info: {
  section: SectionListData<SectionItemProp, SectionDataProp>;
}) => ReactElement = ({ section: { title } }) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 18, padding: 8 }}>
        {title}
      </Text>
    </View>
  );
};

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const updateInputValue = (inputText: string) => setInputValue(inputText);

  return (
    <View style={{ height: 500, width: 400, padding: 16 }}>
      <TextInput
        style={{
          fontSize: 16,
          // @ts-ignore
          outline: "none",
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          padding: 8,
        }}
        value={inputValue}
        placeholder={"Search for a service..."}
        onChangeText={updateInputValue}
      />
      <SectionList
        sections={
          !inputValue
            ? sectionData
            : sectionData.map((each) => {
                return {
                  title: each.title,
                  data: each.data.filter((badge) => {
                    return (
                      badge.key
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      badge.name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );
                  }),
                };
              })
        }
        keyExtractor={(item, index) => item.name + index}
        renderItem={SectionItem}
        renderSectionHeader={!inputValue ? SectionHeader : undefined}
      />
    </View>
  );
};

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.querySelector("#app"),
});
