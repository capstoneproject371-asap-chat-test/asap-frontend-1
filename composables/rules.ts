export const useFormRules = () => {
  return {
    ruleRequired: (value: any) => !!value || 'โปรดระบุ',
    ruleEmail: (value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
    },
    rulePassLen: (value: string) =>
      (!!value && value.length >= 6) ||
      'รหัสผ่านควรมีความยาวไม่น้อยกว่า 6 ตัวอักษร',
  }
}
