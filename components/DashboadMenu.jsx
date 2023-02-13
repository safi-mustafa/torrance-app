import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Linking,
} from "react-native";
import getData from "../api-services/getData";

import appStyles from "../app-styles";
// import Layout from "../constants/Layout";
import FileCell from "./cell-templates/FileCell";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { BASE_URL, STORAGE_URL } from "../constants/Misc";

const MENU_TYPE = {
  EXTERNAL_LINK: "EXTERNAL_LINK",
  ROUTE_REDIRECT: "ROUTE_REDIRECT",
};

const items = [
  // {
  //   title: "Submit Override",
  //   subtitle: "Overtime Request",
  //   icon: require("./../assets/images/journal-book.png"),
  //   url: "NotFound",
  //   type: MENU_TYPE.ROUTE_REDIRECT,
  // },
  // {
  //   title: "Dropbox",
  //   subtitle: "Dropbox Link",
  //   icon: require("./../assets/images/dropbox.png"),
  //   url: "https://dropbox.com/",
  //   type: MENU_TYPE.EXTERNAL_LINK,
  // },
];

export function DashboardMenu({ navigation }) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropboxUrl, setDropbox] = useState(null);

  useEffect(() => {
    getFolders();
    // getDropboxUrl();
    return () => {};
  }, []);

  const getFolders = () => {
    setLoading(true);
    getData(
      { url: "/Folder" },
      (response) => {
        setLoading(false);
        const { items = [] } = response?.data;
        // console.log("🚀 ~ file: DashboadMenu.jsx ~ line 99 ~ getFolders ~ items", items)
        setFolders(items);
      },
      (error) => {
        console.log(
          "🚀 ~ file: DashboadMenu.jsx ~ line 95 ~ getFolders ~ error",
          error
        );
        setLoading(false);
      }
    );
  };

  const getDropboxUrl = () => {
    // setLoading(true);
    getData(
      { url: "/Dropbox" },
      (response) => {
        setLoading(false);
        const { items = [] } = response?.data;

        setDropbox(items.length > 0 ? items[0]?.url : null);
      },
      (error) => {
        console.log(
          "🚀 ~ file: DashboadMenu.jsx ~ line 95 ~ getFolders ~ error",
          error
        );
        setLoading(false);
      }
    );
  };

  const onMenuPress = ({ type = null, ...item }) => {
    if (type === MENU_TYPE.ROUTE_REDIRECT) {
      navigation.push(
        item?.url,
        item?.params && {
          ...item?.params,
        }
      );
    } else if (type === MENU_TYPE.EXTERNAL_LINK) {
      Linking.openURL(item?.url).catch((err) => console.error("Error", err));
    } else {
      navigation.push("SubmissionContent", {
        ...item,
      });
    }
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <View style={styles.section}>
        {folders.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btnWrapper}
            onPress={() => onMenuPress({...item,url:`/Folder/${item?.id}`, template: <FileCell />})}
          >
            <View style={styles.innerBtnWrapper}>
              <View style={{width:"70%"}}>
                <Text style={[appStyles.fw500, appStyles.my1]}>
                  {item?.name}
                </Text>
                {/* <Text style={{ color: "#999", fontSize: 11 }}>{subtitle}</Text> */}
              </View>
              {item?.iconUrl && (
                <Image
                  style={styles.icon}
                  source={{ uri: STORAGE_URL + item?.iconUrl }}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
        {items.map(({ subtitle, icon, ...item }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btnWrapper}
            onPress={() => onMenuPress({ ...item, url: dropboxUrl })}
          >
            <View style={styles.innerBtnWrapper}>
              <View>
                <Text style={[appStyles.fw500, appStyles.my1]}>
                  {item?.title}
                </Text>
                <Text style={{ color: "#999", fontSize: 11 }}>{subtitle}</Text>
              </View>
              <Image style={styles.icon} source={icon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  btnWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 6,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  icon: { height: 38, width: 38, marginLeft: 10 },
  innerBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
