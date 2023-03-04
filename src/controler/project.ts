import { TypedRequestBody, TypedResponse } from "~/interfaces"
import { Project } from "~/model/project"
import { NextFunction } from 'express'
import { ExpressError } from "~/middleware/error"
import { BASE_SERVER } from "~/data/conn"
import fs from "fs"

export class CProject {
    static getAll = async (request: Express.Request, response: TypedResponse<Project[]>) => {
        const projects = await Project.findAll()
        response.json(projects)
    }
    static add = async (request: TypedRequestBody<Project, {}>, response: TypedResponse<Project>, next: NextFunction) => {
        try {
            if (request.file) request.body.image = `${BASE_SERVER}/images/${request.file.filename}`
            const newProject = await Project.create(request.body)
            response.json(newProject)
        } catch (e: any) {
            next(e)
        }
    }
    static delete = async (request: TypedRequestBody<{}, { id: number }>, response: TypedResponse<{ mess: string }>, next: NextFunction) => {
        try {
            const bddProject = await Project.findByPk(request.params.id)
            if (bddProject) {
                const oldImgName = bddProject.dataValues.image
                if (oldImgName) fs.unlink(`./uploads/${oldImgName.split('/')[4]}`, (err: any) => {
                    if (err) console.error(err);

                })

                await bddProject.destroy()
                throw new ExpressError(200, "Projet supprimé")
            }
            else throw new ExpressError(410, "Projet non trouvé")
        } catch (e) {
            next(e)
        }
    }
}