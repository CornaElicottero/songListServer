import {ReactComponent as Home} from "../assets/house-solid.svg";
import {ReactComponent as Add} from "../assets/square-plus-solid.svg";
import {ReactComponent as List} from "../assets/list-ul-solid.svg";
import {ReactComponent as History} from "../assets/clock-rotate-left-solid.svg";
import {ReactComponent as Menu} from "../assets/bars-solid.svg";

const Header = () => {
    return (
        <div className={'header'}>
            <div className={'logo_wrapper'}>
                <div className={'logo'}>.your soul.</div>
                <div className={'status'}>онлайн</div>
            </div>
            <div className={'navbar_wrapper'}>
                <button><Home className={"icon"} /><span>Главная</span></button>
                <button><Add className={"icon"}/><span>Добавить песню</span></button>
                <button><List className={"icon"}/><span>Очередь заказов</span></button>
                <button><History className={"icon"}/><span>История заказов</span></button>
            </div>
        </div>
    )
}

export default Header;