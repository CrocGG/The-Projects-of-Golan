import { useEffect, useState } from "react";
import useTitle from "../../../hooks/use-title";
import { VacationModel } from "../../../models/Vacation";
import useService from "../../../hooks/use-service";
import VacationService from "../../../services/VacationService";
import "./GetVacationNormalEvery.css"
import LikerService from "../../../services/LikerService";
import Amazonna from "../../../assets/amazon_river.webp"
import BeautyGirl from "../../../assets/beautiful_aussie_girl.webp"
import CherryBlossom from "../../../assets/cherry_blossom.webp"
import Jiraffa from "../../../assets/giraffes.jpeg"
import BimboesClubbing from "../../../assets/girls_at_the_club.webp"
import ParadiseBeach from "../../../assets/hawaiian_beach.jpg"
import PanamaTurtle from "../../../assets/panama_turtle.webp"
import ParaguayBlonde from "../../../assets/paraguay_beautiful_view.jpg"
import ShukkiTheTukki from "../../../assets/peruvian_toucans.png"
import DangerousTigerMommy from "../../../assets/savannah_tiger.webp"
import TajMahal from "../../../assets/taj_mahal.webp"
import ThailandoBailando from "../../../assets/thailand_waterfall.jpg"
import { NavLink } from "react-router-dom";

export default function GetVacationNormalEvery() {

    useTitle('Vacations - Normal - Every');

    const [wholeVacations, setVacations] = useState<VacationModel[]>([])

    const vacationService = useService(VacationService);

    const likerService = useService(LikerService);


    const [buttonText, setButtonText] = useState<string>('🤍 Like ')

    const likeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await likerService.createLiker(event.currentTarget.value);
            alert('vacation liked!')
        }
        catch (error) {
            console.log(error)
        }
    }

    const hateClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await likerService.annihilateLiker(event.currentTarget.value);
            alert('vacation hated!')
        }
        catch (error) {
            console.log(error)
        }
    }

    const vacationsPictures = [
        {
            "identity": "54e2a55c-bcf6-11f0-8552-7aaf1c767246",
            "picFile": Amazonna
        },
        {
            "identity": "1e2065cb-bc75-11f0-9284-92bd85fa5acf",
            "picFile": BeautyGirl
        },
        {
            "identity": "b2b2fb37-bc75-11f0-9284-92bd85fa5acf",
            "picFile": CherryBlossom
        },
        {
            "identity": "2fc6884d-bc76-11f0-9284-92bd85fa5acf",
            "picFile": Jiraffa
        },
        {
            "identity": "2fc691b7-bc76-11f0-9284-92bd85fa5acf",
            "picFile": BimboesClubbing
        },
        {
            "identity": "3e42cc9f-bc75-11f0-9284-92bd85fa5acf",
            "picFile": ParadiseBeach
        },
        {
            "identity": "7881b4f2-eb5e-4072-882d-16b3b9c312a7",
            "picFile": PanamaTurtle
        },
        {
            "identity": "bbf7112f-bcf6-11f0-8552-7aaf1c767246",
            "picFile": ParaguayBlonde
        },
        {
            "identity": "b2b30464-bc75-11f0-9284-92bd85fa5acf",
            "picFile": ShukkiTheTukki
        },
        {
            "identity": "ebb4c36f-bc75-11f0-9284-92bd85fa5acf",
            "picFile": DangerousTigerMommy
        },
        {
            "identity": "b2b2f16e-bc75-11f0-9284-92bd85fa5acf",
            "picFile": TajMahal
        },
        {
            "identity": "1e205c37-bc75-11f0-9284-92bd85fa5acf",
            "picFile": ThailandoBailando
        }
    ]


    const buttonTwitchLike = (event: React.MouseEvent<HTMLButtonElement>) => {
        buttonTextChangerLike(event.currentTarget.value);
    }

    const buttonTextChangerLike = async (vacationId: string) => {
        try {
            const likerList = await likerService.getLikers();
            if (likerList.filter(liker => vacationId.includes(liker.vacationId))) {
                setButtonText('❤️ Loved')
            }
            else {
                setButtonText('🤍 Like ')
            };
        }
        catch (error) {
            alert('Server stuck...and it sucks!');
            console.log(error);
        }
    }

    const buttonTwitchHate = (event: React.MouseEvent<HTMLButtonElement>) => {
        buttonTextChangerHate(event.currentTarget.value);
    }

    const buttonTextChangerHate = async (vacationId: string) => {
        try {
            const likerList = await likerService.getLikers();
            if (!likerList.filter(liker => vacationId.includes(liker.vacationId))) {
                setButtonText('❤️ Loved')
            }
            else {
                setButtonText('🤍 Like ')
            };
        }
        catch (error) {
            alert('Server stuck...and it sucks!');
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const vacations = await vacationService.getVacationsEvery();
                setVacations(vacations);
            }
            catch (error) {
                console.log(error)
            }
        })()
    }, [vacationService])

    return (
        <div className="vacation-list">
            <h1 className='vacations-title'>Vacation List - Every</h1>
            <div className="filter-checkbox-container">
                <NavLink to={`/vacation/vacation-normal/vacation-liked`}>
                    <button>Liked</button>
                </NavLink>
                <NavLink to={`/vacation/vacation-normal/vacation-upcoming`}>
                    <button>Upcoming</button>
                </NavLink>
                <NavLink to={`/vacation/vacation-normal/vacation-active`}>
                    <button>Active</button>
                </NavLink>
            </div>
            <div className="vacations-container-normal">
                {wholeVacations.map(({ id, destination, description, beginningDate, endingDate, price, likers, imageUrl }) => (
                    <div key={id} className="single-container-normal">
                        <h3><strong>Destination:</strong> {destination}</h3>
                        <h3><strong>Description:</strong> {description}</h3>
                        <h3><strong>Beginning Date:</strong> {beginningDate as unknown as string}</h3>
                        <h3><strong>Ending Date:</strong> {endingDate as unknown as string}</h3>
                        <h3><strong>Price:</strong> {price}</h3>
                        <div className="button-section">
                            <button className="like-click" onClick={(id) => { likeClick(id); buttonTwitchLike(id) }} value={id}>{buttonText}::{likers.length}</button>
                            <button className="hate-click" onClick={(id) => { hateClick(id); buttonTwitchHate(id) }} value={id}>🤮 Hate</button>
                        </div>
                        <img src={(vacationsPictures.filter(picture => id.includes(picture.identity)).map(picture => picture.picFile)[0]) || `${import.meta.env.VITE_S3_URL}${imageUrl}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}







