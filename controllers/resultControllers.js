import { createResultsService, updateResultService } from "../services/resultService.js";

export const createResultsController = async (req, res, next) => {
    try{
        const { event_id } = req.params;
        const { data } = req.body;

        await createResultsService(data, event_id);


        res.status(201).json({
            status: 201,
            message: 'Partidos creados correctamente'
        })
    }catch(error){
        next(error);
    }
}

export const updateResultController = async (req, res, next) => {
    try{
        const { result_id } = req.params;
        const { data } = req.body;

        await updateResultService(data, result_id);

        res.status(200).json({
            status: 200,
            message: 'Resultado actualizado correctamente'
        });
    }catch(error){
        next(error);
    }
}