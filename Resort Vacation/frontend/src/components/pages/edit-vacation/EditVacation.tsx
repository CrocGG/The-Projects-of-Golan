import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../hooks/use-title";
import useService from "../../../hooks/use-service";
import VacationService from "../../../services/VacationService";
import { useForm } from "react-hook-form";
import { VacationDraftModel } from "../../../models/VacationDraft";
import { useAppSelector } from "../../../hooks/use-selector";
import { useEffect } from "react";
import { AppState } from "../../../redux/Store";

export default function EditVacation() {

    useTitle('Edit Vacation');

    const { id } = useParams<'id'>()

    const vacationService = useService(VacationService);

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState, setValue } = useForm<VacationDraftModel>();

    const vacations = useAppSelector((state: AppState) => state.vacations);

    useEffect(() => {
        if (id) {
            loadVacation(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, vacations]);


    async function loadVacation(id: string) {
        try {
            const editedVacation = vacations.find(vacation => vacation.id === id);

            let vacation: VacationDraftModel;

            if (editedVacation) {
                vacation = editedVacation;
            }

            else {
                vacation = await vacationService.getOneVacation(id)
            }
            setValue('destination', vacation.destination);
            setValue('description', vacation.description);
            setValue('price', vacation.price);
        }
        catch (error) {
            alert('cannot find vacation to be edited')
            console.log(error)
        }
    }

    async function onSubmit(draft: VacationDraftModel) {
        draft.imageFile = (draft.imageFile as unknown as FileList)[0]
        try {
            if (id) {
                await vacationService.editVacation(id!, draft)
            }
            reset();
            alert('Vacation Edited!')
            navigate('/vacation/vacation-manager')
        } catch (error) {
            alert('You must have reversed timeline and made the ending date earlier than the beginning')
            console.log(error)
        }
    }


    return (
        <div className='EditVacation'>
            <h1>Edit Vacation</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='edit-vacation-form'>
                <label>Destination: <input type="text" {...register('destination', {
                    required: {
                        value: true,
                        message: 'Destination is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.destination?.message}</div>
                <label>Description: <textarea {...register('description', {
                    required: {
                        value: true,
                        message: 'Description is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.description?.message}</div>
                <label>Beginning Date: <input type="datetime-local" {...register('beginningDate', {
                    required: {
                        value: true,
                        message: 'Beggining Date is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.beginningDate?.message}</div>
                <label>Ending Date: <input type="datetime-local" {...register('endingDate', {
                    required: {
                        value: true,
                        message: 'Ending Date is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.endingDate?.message}</div>
                <label>Price: <input type="number" min="1" step="1" {...register('price', {
                    required: {
                        value: true,
                        message: 'Price is required'
                    },
                    min: {
                        value: 0,
                        message: 'Price must not be negative'
                    }
                    ,
                    max: {
                        value: 10000,
                        message: 'Price must not exceed ten-thousand dollars'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.price?.message}</div>
                <label>Image File: <input type="file" {...register('imageFile')} /></label>
                <div className="form-buttons">
                    <button type="submit" className='edit-vacation-button'>Edit Vacation</button>
                </div>
            </form>
        </div>
    )
}


