//Node and Library imports
import * as path from "path";
const Datastore = require("nedb");

//Interface for describing a Contact
export interface IContact {
    _id?: number,
    name: string,
    email: string
}

export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }

    //Promise to resolve returning array of IContact items using generics
    public listContacts(): Promise<IContact[]> {
        return new Promise((inResolve, inReject) => {
            //pass empty search criteria and return all records
            this.db.find({},
                (inError: Error, inDocs: IContact[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

}
