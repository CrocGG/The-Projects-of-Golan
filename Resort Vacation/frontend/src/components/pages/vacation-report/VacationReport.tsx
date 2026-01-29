import { useEffect, useState } from 'react';
import useTitle from '../../../hooks/use-title';
import './VacationReport.css'
import useService from '../../../hooks/use-service';
import { VacationModel } from '../../../models/Vacation';
import VacationService from '../../../services/VacationService';

export default function VacationReport() {

    useTitle('Vacation Report');

    const [wholeVacations, setVacations] = useState<VacationModel[]>([])

    const vacationService = useService(VacationService);

    useEffect(() => {
        (async () => {
            try {
                const vacations = await vacationService.getVacationsManager()
                setVacations(vacations)
            }
            catch (error) {
                alert('Server stuck...and it sucks!')
                console.log(error)
            }
        })()
    }, [vacationService])

    return (
        <div className='vacation-report'>
            <h1>Vacation Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Vacation Name</th>
                        <th>Vacations Liked</th>
                    </tr>
                </thead>
                <tbody>
                    {wholeVacations.map(({ id, destination, likers }) => <tr key={id}>
                        <th>{destination}</th>
                        <th>{likers.length}</th>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}











