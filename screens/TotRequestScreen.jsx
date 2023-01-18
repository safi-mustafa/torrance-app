import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from "react-native-picker-select";

export default function TotRequestScreen({
  navigation,
}) {
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: TotRequestScreen.tsx ~ line 18 ~ onSubmit ~ values",
      values
    );
  };

  return (
    <>
      {/* <Loader show={loading} size="large" overlay="true" color="white" /> */}
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
                <View>
                  <Text>Email</Text>
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                <View>
                  <Text>Department</Text>
                  <RNPickerSelect
                    onValueChange={(value) =>
                      setFieldValue("department", value)
                    }
                    items={[
                      { label: "Football", value: "football" },
                      { label: "Baseball", value: "baseball" },
                      { label: "Hockey", value: "hockey" },
                    ]}
                  />
                </View>
                <Button onPress={handleSubmit} title="Submit" />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
