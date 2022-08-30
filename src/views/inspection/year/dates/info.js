export const config = () => {
  return {
    year_no: {
      component: 'select',
      label: '年检年度',
      colSpan: 8,
      name: 'year_no',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: [
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' }
      ]
    },
    is_open: {
      component: 'select',
      label: '启用标识',
      colSpan: 8,
      name: 'is_open',
      config: {
        rules: [{ required: false }]
      },
      componentProps: {
        clearable: true
      },
      options: [
        { label: '0-未启用', value: '0' },
        { label: '1-启用', value: '1' }
      ]
    }
  }
}
