import React, {useEffect, useState} from 'react';
import {Button, Image, Platform, Text, View} from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getProfileImgUploadLink, uploadProfileImage} from '../../api/aws';

const Profile = () => {
  const [profileImgUploadLink, setProfileImageUploadLink] = useState('');
  const [photo, setPhoto] = React.useState<Asset>(null);
  useEffect(() => {
    (async () => {
      const s3Link = await getProfileImgUploadLink();
      setProfileImageUploadLink(s3Link);
    })();
  }, []);

  const handleUploadPhoto = async () => {
    const data = await createFormData(photo);
    console.log('form data:');
    console.log(data);
    try {
      await uploadProfileImage(profileImgUploadLink, data);
    } catch (e) {
      console.log(e);
    }
  };

  const createFormData = async (photoData: Asset) => {
    // const data = new FormData();

    // data.append('photo', {
    //   name: photoData.fileName,
    //   type: photoData.type,
    //   uri:
    //     Platform.OS === 'ios'
    //       ? photoData.uri && photoData.uri.replace('file://', '')
    //       : photoData.uri,
    // });
    console.log('photo uri: ', photoData.uri);
    const resp = await fetch(photoData.uri || '');
    const imageBody = await resp.blob();
    console.log('imageBody', imageBody);

    // Object.keys(body).forEach(key => {
    //   data.append(key, body[key]);
    // });

    return imageBody;
  };

  const handleChoosePhoto = (): void => {
    launchImageLibrary(
      {mediaType: 'photo'},
      (response: ImagePickerResponse) => {
        // console.log(response);
        if (response && response.assets) {
          setPhoto(response.assets[0]);
        }
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {photo && (
        <>
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </SafeAreaView>
  );
};
export default Profile;
