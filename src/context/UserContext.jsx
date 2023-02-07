function UserContext() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    try {
      const getUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser.uid;

        const docRef = doc(db, "Users", user);
        const docSnap = await getDoc(docRef);

        setCurrentUser(docSnap.data());
      };
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <div></div>;
}
export default UserContext;
