import React from 'react'
import { PropsLogListType } from "./type"
import style from "./style.module.css"
import { Button } from '../../UI'
import { createClasses } from '../../utility'
import LogItem from '../LogItem/LogItem'
import axios from 'axios'
import { endPoints } from '../../constant'
import { useStore } from '../../store'




const LogList: React.FC<PropsLogListType> = (props) => {
    const { logList = [] } = props;
    const [logs, setLogs] = React.useState(logList);
    const { changeMessage } = useStore();

    const handleRemoveLogs = async () => {
        try {
            const response = await axios(`${endPoints.log}`, {
                method: "delete"
            })
            const data = response.data;
            changeMessage(data.msg, "success");
            setLogs([]);
        } catch (error) {
            changeMessage("Error", "success")
        }
    }

    return (
        <div className={createClasses(style.log_list, "header__notification-list")}>
            {logs.length != 0 ?
                <>
                    <div className={style.log_list__grid}>
                        {logs.map((log, index) => {
                            return (
                                <LogItem
                                    key={log._id}
                                    id={log._id}
                                    position={index + 1}
                                    name={log.name}
                                    action={log.action}
                                    time={log.updatedAt}
                                />
                            )
                        })}
                    </div>
                    <Button
                        onClick={handleRemoveLogs}
                        typeButton='button'
                        cssSelector={createClasses(style.log_list__button, "primary-button")}
                    >
                        Remove all log
                    </Button>
                </>
                : <h2 className='sub-title'>Notification list is empty</h2>
            }
        </div>
    )
}

export default LogList