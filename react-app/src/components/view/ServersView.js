import { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { getUserThunk } from "../../store/session";

export default function ServersView() {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const serversArr = user.servers
    const userId = user.id

    useEffect(() => {
        dispatch(getUserThunk(userId))
    }, [dispatch, userId])

    return (
        <div>Test</div>
    )
};
