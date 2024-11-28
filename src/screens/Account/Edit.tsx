// import {useUser} from '@clerk/clerk-expo';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import {
//   BottomSheetScrollView,
//   BottomSheetTextInput,
// } from '@gorhom/bottom-sheet';
// import React, {useCallback, useEffect, useState} from 'react';
// import {Alert, Image, ImageStyle} from 'react-native';

// import {FormField} from '$/src/components/feature/Auth/SignUp/state';
// import {Button} from '$/src/components/global';
// import TextInput from '$/src/components/global/TextInput';
// import {Container} from '$/src/components/utils';
// import {a} from '$/src/lib/style/atoms';
// ;
// import {hexWithOpacity} from '$/src/lib/ui/helpers';
// import useApi from '$/src/hooks/api/useApi';
// import {ButtonText} from '$/src/components/global/Button';

// type Fields = 'firstName' | 'lastName' | 'phoneNumber';

// export const snapPoints = ['50%', '90%'];
// export const enablePanDownToClose = false;

// export default function Edit() {
//   const {user} = useUser();
//   const {update} = useApi().users;
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<{[key in Fields]: FormField}>({
//     phoneNumber: {value: '', error: ''},
//     firstName: {error: '', value: ''},
//     lastName: {error: '', value: ''},
//   });

//   const updateUser = useCallback(async () => {
//     const {firstName, lastName, phoneNumber} = formData;
//     console.log({firstName, lastName, phoneNumber});
//     if (!(firstName.value || lastName.value || phoneNumber.value))
//       return Alert.alert('No details to update');

//     setLoading(true);
//     await update({
//       firstName: firstName.value,
//       lastName: lastName.value,
//       phoneNumber: phoneNumber.value,
//     });
//     setLoading(false);
//   }, [formData, update]);

//   useEffect(() => {
//     console.log({formData});
//   }, [formData]);

//   return (
//     <BottomSheetScrollView showsVerticalScrollIndicator={false}>
//       <Container style={[a.py_3xl]}>
//         <Button
//           variant="ghost"
//           style={[a.self_center, a.rounded_md, a.py_0, a.bg_(colors.yellow_2)]}>
//           <>
//             {user?.imageUrl ? (
//               <Image
//                 source={{uri: user.imageUrl}}
//                 style={[a.w_(100), a.h_(100)] as ImageStyle}
//               />
//             ) : (
//               <Ionicons
//                 name="image-outline"
//                 size={60}
//                 style={[
//                   a.absolute,
//                   a.z_40,
//                   a.bg_(colors.light_1),
//                   a.bottom_(0),
//                   a.right_0,
//                 ]}
//               />
//             )}
//           </>
//         </Button>
//         <TextInput
//           altComponent={BottomSheetTextInput}
//           containerStyle={[
//             a.mt_md,
//             a.bg_(hexWithOpacity(colors.light_2, 0.3)),
//             a.rounded_full,
//           ]}
//           placeholder="first name"
//           value={formData.firstName.value}
//           focusStyle={isFocused => ({
//             borderColor: isFocused ? colors.yellow_2 : 'transparent',
//             borderWidth: isFocused ? 2 : 1,
//             backgroundColor: 'transparent',
//           })}
//           onChangeText={text =>
//             setFormData(prev => ({
//               ...prev,
//               firstName: {...prev.firstName, value: text},
//             }))
//           }
//         />
//         <TextInput
//           altComponent={BottomSheetTextInput}
//           containerStyle={[
//             a.mt_md,
//             a.bg_(hexWithOpacity(colors.light_2, 0.3)),
//             a.rounded_full,
//           ]}
//           placeholder="last name"
//           value={formData.lastName.value}
//           focusStyle={isFocused => ({
//             borderColor: isFocused ? colors.yellow_2 : 'transparent',
//             borderWidth: isFocused ? 2 : 1,
//             backgroundColor: 'transparent',
//           })}
//           onChangeText={text =>
//             setFormData(prev => ({
//               ...prev,
//               lastName: {...prev.lastName, value: text},
//             }))
//           }
//         />
//         <TextInput
//           altComponent={BottomSheetTextInput}
//           containerStyle={[
//             a.mt_md,
//             a.bg_(hexWithOpacity(colors.light_2, 0.3)),
//             a.rounded_full,
//           ]}
//           placeholder="phone number"
//           value={formData['phoneNumber'].value}
//           focusStyle={isFocused => ({
//             borderColor: isFocused ? colors.yellow_2 : 'transparent',
//             borderWidth: isFocused ? 2 : 1,
//             backgroundColor: 'transparent',
//           })}
//           onChangeText={text => {
//             setFormData(prev => ({
//               ...prev,
//               phoneNumber: {value: text, error: ''},
//             }));
//           }}
//           keyboardType="phone-pad"
//           textContentType="telephoneNumber"
//         />
//         <Button
//           onPress={updateUser}
//           variant="solid"
//           color="primary"
//           shape="round"
//           style={[a.mt_md]}>
//           <ButtonText>Update Details</ButtonText>
//         </Button>
//       </Container>
//     </BottomSheetScrollView>
//   );
// }

import {useUser} from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, ImageStyle} from 'react-native';

import {Button} from '$/src/components/global';
import TextInput from '$/src/components/global/TextInput';
import {Container} from '$/src/components/utils';
import {a} from '$/src/lib/style/atoms';
;
import {hexWithOpacity} from '$/src/lib/ui/helpers';
import useApi from '$/src/hooks/api/useApi';
import {ButtonText} from '$/src/components/global/Button';

export const snapPoints = ['50%', '90%'];
export const enablePanDownToClose = false;

export default function Edit() {
  const {user} = useUser();
  const {update} = useApi().users;
  const [loading, setLoading] = useState(false);

  // Separate states for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateUser = useCallback(async () => {
    setIsSubmitted(true);
  }, [firstName, lastName, phoneNumber, update]);

  useEffect(() => {
    if (!isSubmitted) return;

    const submit = async () => {
      if (!(firstName || lastName || phoneNumber)) {
        return Alert.alert("There's No details to update");
      }

      setLoading(true);
      console.log({firstName, lastName, phoneNumber});
      await update({
        firstName,
        lastName,
        phoneNumber,
      });
      setLoading(false);
    };
    submit();
    setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
      <Container style={[a.py_3xl]}>
        <Button
          variant="ghost"
          style={[a.self_center, a.rounded_md, a.py_0, a.bg_(colors.primary)]}>
          <>
            {user?.imageUrl ? (
              <Image
                source={{uri: user.imageUrl}}
                style={[a.w_(100), a.h_(100)] as ImageStyle}
              />
            ) : (
              <Ionicons
                name="image-outline"
                size={60}
                style={[
                  a.absolute,
                  a.z_40,
                  a.bg_(colors.light_1),
                  a.bottom_(0),
                  a.right_0,
                ]}
              />
            )}
          </>
        </Button>
        <TextInput
          altComponent={BottomSheetTextInput}
          containerStyle={[
            a.mt_md,
            a.bg_(hexWithOpacity(colors.light_2, 0.3)),
            a.rounded_full,
          ]}
          placeholder="first name"
          value={firstName}
          focusStyle={isFocused => ({
            borderColor: isFocused ? colors.primary : 'transparent',
            borderWidth: isFocused ? 2 : 1,
            backgroundColor: 'transparent',
          })}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          altComponent={BottomSheetTextInput}
          containerStyle={[
            a.mt_md,
            a.bg_(hexWithOpacity(colors.light_2, 0.3)),
            a.rounded_full,
          ]}
          placeholder="last name"
          value={lastName}
          focusStyle={isFocused => ({
            borderColor: isFocused ? colors.primary : 'transparent',
            borderWidth: isFocused ? 2 : 1,
            backgroundColor: 'transparent',
          })}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          altComponent={BottomSheetTextInput}
          containerStyle={[
            a.mt_md,
            a.bg_(hexWithOpacity(colors.light_2, 0.3)),
            a.rounded_full,
          ]}
          placeholder="phone number"
          value={phoneNumber}
          focusStyle={isFocused => ({
            borderColor: isFocused ? colors.primary : 'transparent',
            borderWidth: isFocused ? 2 : 1,
            backgroundColor: 'transparent',
          })}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
        />
        <Button
          loading={loading}
          onPress={updateUser}
          variant="solid"
          color="primary"
          shape="round"
          style={[a.mt_md]}>
          <ButtonText>Update Details</ButtonText>
        </Button>
      </Container>
    </BottomSheetScrollView>
  );
}
