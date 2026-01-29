import { useForm } from "react-hook-form";
import { VacationDraftModel } from "../../../models/VacationDraft";
import useTitle from "../../../hooks/use-title";
import useService from "../../../hooks/use-service";
import VacationService from "../../../services/VacationService";
import { useNavigate } from "react-router-dom";
import "./AddVacation.css"

export default function AddVacation() {

    useTitle('Add Vacation');

    const vacationService = useService(VacationService);

    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState } = useForm<VacationDraftModel>();

    async function onSubmit(draft: VacationDraftModel) {
        draft.imageFile = (draft.imageFile as unknown as FileList)[0]
        try {
            await vacationService.createVacation(draft);
            alert('Vacation added successfully');
            reset();
            navigate('/vacation/vacation-manager');

        } catch (error) {
            alert('Do not forget the beginning date must be greater than now, and, the ending date must be greater than the beginning date!')
            console.log(error)
        }
    }

    return (
        <div className='AddVacation'>
            <h1>Add Vacation</h1>
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
                <label>Image File: <input type="file" {...register('imageFile', {
                    required: {
                        value: true,
                        message: 'Image file is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.imageFile?.message}</div>
                <div className="form-buttons">
                    <button type="submit" className='add-vacation-button'>Add Vacation</button>
                </div>
            </form>
        </div>
    )
}




