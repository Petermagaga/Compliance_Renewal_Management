const { id } = useParams();

const [item, setItem] = useState(null);

useEffect(() => {

    complianceService.getItem(id)

        .then(res => setItem(res.data));

}, [id]);