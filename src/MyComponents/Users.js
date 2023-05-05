import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../hooks";
import { useNavigate, useLocation } from "react-router-dom";

export default function Users() {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRun = useRef(false);

    useEffect(() => {
        // use to control axios req
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal,
                });
                isMounted && setData(response.data.data);
            } catch (error) {
                console.log(error);
                navigate("/login", {
                    state: { from: location }, replace: true
                });
            }
        };

        //strict mode causing twice render so abort request which throw error so used useRef
        if (effectRun.current) {
            getUsers();
        }

        return () => {
            //aborting request if component unmounts.
            isMounted = false;
            controller.abort();
            effectRun.current = true;
        }
    }, []);

    return (
        <article style={{ width: "100%" }}>
            <p className="text" style={{ margin: 0 }}>Users List</p>
            {
                data.length ?
                    <div className="table-data-div">
                        <table>
                            <tbody>
                                <tr><th>Username</th><th>Roles assigned</th></tr>
                                {
                                    data.map((item, index) =>
                                        <tr key={index}><th>{item.username}</th><th>{Object.keys(item.roles).join(", ")}</th></tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className="text">No users to display</p>
            }
        </article>
    );
}