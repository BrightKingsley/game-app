import {Audio} from 'expo-av';

export async function playAudio(file: any) {
  try {
    const {sound} = await Audio.Sound.createAsync(file);
    await sound.playAsync();
    return sound;
  } catch (error) {
    return null;
  }
}

export async function stopAudio(sound: Audio.Sound) {
  try {
    if (sound !== null) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  } catch (error) {
    return null;
  }
}
