import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Color } from "../../components/theme";

export function NameDisplay({ user }) {
    let User = user;
    const Colors = Color()
    if (User.meta.gender == "male") {
        return (
            <>
                Bro.
                {User.name.split(" ")[0] == "Bro." ||
                    User.name.split(" ")[0] == "Brother" ||
                    User.name.split(" ")[0] == "Bro" ||
                    User.name.split(" ")[0] == "Sis" ||
                    User.name.split(" ")[0] == "Sis." ||
                    User.name.split(" ")[0] == "SIS" ||
                    User.name.split(" ")[0] == "Sister" ?
                    <>
                        {" " + User.name.split(" ")[1] + " " + User.name.split(" ")[2] + " "} {User.name.split(" ")[3] && User.name.split(" ")[3]}
                        {User.role && User.role.verified == true && <> <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={12} icon={faCheckCircle} /></>}
                    </>
                    : <>
                        {" " + User.name.split(" ")[0] + " " + User.name.split(" ")[1] + " "}{User.name.split(" ")[2] && User.name.split(" ")[2]}
                        {User.role && User.role.verified == true && <> <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={12} icon={faCheckCircle} /></>}

                    </>}
            </>
        )
    } else {
        return (
            <>
                Sis.
                {User.name.split(" ")[0] == "Bro" || User.name.split(" ")[0] == "Bro." ||
                    User.name.split(" ")[0] == "Brother" || User.name.split(" ")[0] == "Sis." ||
                    User.name.split(" ")[0] == "SIS" || User.name.split(" ")[0] == "Sis" ||
                    User.name.split(" ")[0] == "Sister" ?
                    <>
                        {" " + User.name.split(" ")[1] + " " + User.name.split(" ")[2] + " "}{User.name.split(" ")[3] && User.name.split(" ")[3]}
                        {User.role && User.role.verified == true && <> <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={12} icon={faCheckCircle} /></>}
                    </>
                    :
                    <>
                        {" " + User.name.split(" ")[0] + " " + User.name.split(" ")[1] + " "}{User.name.split(" ")[2] && User.name.split(" ")[2]}
                        {User.role && User.role.verified == true && <> <FontAwesomeIcon style={{
                            flex: 1,
                            color: Colors.primary,
                            marginLeft: 10

                        }} size={12} icon={faCheckCircle} /></>}
                    </>

                }
            </>
        )
    }
}