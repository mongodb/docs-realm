const CreateNewEmployeeInput = () => {
  const employees = useQuery(Employee);
  const [employeeName, setEmployeeName] = useState('Angela Martin');
  const realm = useRealm();

  // Create a new Company object - wrapped in a useEffect with empty dependency to avoid unecessary rendering
  useEffect(() => {
    realm.write(() => {
      realm.create('Company', {
        _id: COMPANY_ID, 
        name: 'Dunder Mifflin', 
        employees: employees
      })
    });
  }, []); 
  
  // Add a new Employee to our Company object
  const handleAddEmployee = () => {
    realm.write(() => {
        realm.create('Employee', {
          _id: EMPLOYEE_ID, 
          name: employeeName, 
          birthdate: new Date('1971-6-25')
        })
    })
  }

  return (
    <>
      <TextInput onChangeText={setEmployeeName} value={employeeName} />
      <Button
        onPress={() => handleAddEmployee()}
        title='Add New Employee'
        testID='handleAddEmployeeBtn' 
      />
    </>
  );
}
