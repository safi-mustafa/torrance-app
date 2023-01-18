import {
  Formik
} from "formik";
import { useState } from "react";
import { StyleSheet, View, Button, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import appStyles from "../app-styles";

import FormLoop from "../components/form/FormLoop";
import Loader from "../components/Loader";
import { totFields } from "../fields/tot.fields";

export default function TotRequestScreen({ navigation }) {

  const [loading, setLoading] = useState(false)
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: TotRequestScreen.tsx ~ line 18 ~ onSubmit ~ values",
      values
    );
  };

  return (
    <>
      <Loader show={loading} size="large" overlay="true" color="white" />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{}}
            onSubmit={onSubmit}
            valueOnChange={(a) => console.log(a)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <>
                <FormLoop
                  fields={totFields}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                  handleSubmit={handleSubmit}
                />
                <Pressable style={[appStyles.btn, appStyles.btnPrimary]} onPress={handleSubmit}><Text style={[appStyles.btnText, appStyles.btnTextPrimary]}>Submit Request</Text></Pressable>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
