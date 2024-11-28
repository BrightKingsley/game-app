import {a} from '#/lib/style/atoms';

import t from '$/locales/translate';
import Dropdown from '$/src/components/global/Dropdown';
import TextInput, {DateInput} from '$/src/components/global/TextInput';

import {useFormContext} from './state';

export default function StepTwo() {
  const {
    referee,
    gender,
    setReferee,
    setGender,
    setDateOfBirth,
    setAnniversary,
  } = useFormContext();

  return (
    <>
      <DateInput
        getDate={date => setDateOfBirth({value: date.toString(), error: ''})}
        label={t('date_of_birth')}
        containerStyle={[a.mt_2xl]}
        style={[a.mt_sm]}
      />

      <DateInput
        getDate={date => setAnniversary({value: date.toString(), error: ''})}
        label={t('anniversary_day')}
        containerStyle={[a.mt_2xl]}
        style={[a.mt_sm]}
      />

      <Dropdown
        selected={gender.value}
        items={[
          {label: 'M', value: 'M'},
          {label: 'F', value: 'F'},
          {label: 'Other', value: 'other'},
        ]}
        onSelect={value => setGender({value, error: ''})}
      />

      <TextInput
        value={referee.value}
        errorText={referee.error}
        onChangeText={text => setReferee({value: text, error: ''})}
        label={t('refer_by')}
        labelStyle={[a.text_(colors.dark_3)]}
        containerStyle={[a.mt_2xl]}
        placeholder="briggskvngzz@gmail.com"
        keyboardType="email-address"
        textContentType="emailAddress"
        style={[a.mt_sm]}
      />
    </>
  );
}
