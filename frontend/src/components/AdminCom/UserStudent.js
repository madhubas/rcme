import React,{useEffect} from 'react'

const UserStudent = () => {
    const [image,setimage] = useState()
    useEffect(() => {
        import(`./public/${values.filename}`).then(image => {
          setimage(image['default']);
        });
    },[])
    return (
        <div>
            
        </div>
    )
}

export default UserStudent
