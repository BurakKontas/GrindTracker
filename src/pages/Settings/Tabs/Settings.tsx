import React, { Dispatch, SetStateAction, useState } from "react";
import "./global.css";
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Dialog } from "primereact/dialog";
import { SettingsCharacter, SettingsCharacterDefault } from "../../../types/Settings/Character";
import { Classes } from "../../../types/Settings/Classes";
import { useSelector } from "react-redux";
import { addCharacter, getCharacters, removeCharacter } from "../../../redux/Settings/slice";
import { useAppDispatch } from "../../../redux/hooks";


type AddCharacterDialogProps = {
    displayModal: boolean;
    setDisplayModal: Dispatch<SetStateAction<boolean>>;
    newCharacter: SettingsCharacter;
    setNewCharacter: Dispatch<SetStateAction<SettingsCharacter>>;
    dialogFooter?: React.ReactNode;
};


function AddCharacterDialog({ displayModal, setDisplayModal, newCharacter, setNewCharacter, dialogFooter }: AddCharacterDialogProps) {
    return (
        <Dialog
            header="Add New Character"
            visible={displayModal}
            draggable={false}
            style={{ width: '50vw' }}
            footer={dialogFooter}
            onHide={() => setDisplayModal(false)}
        >
            <div className="settings-tab-addcharacter-dialog-div">
                <label>Character Name:</label>
                <input type="text" value={newCharacter.name} onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })} />
            </div>
            <div className="settings-tab-addcharacter-dialog-div">
                <label>Character Class:</label>
                <select style={{ paddingRight: 83 }} value={newCharacter.class} onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value as Classes })}>
                    {Object.values(Classes).map((classOption) => (
                        <option key={classOption} value={classOption}>
                            {classOption}
                        </option>
                    ))}
                </select>
            </div>
            <div className="settings-tab-addcharacter-dialog-div">
                <label>Character Level:</label>
                <input type="number" value={newCharacter.level} onChange={(e) => setNewCharacter({ ...newCharacter, level: parseInt(e.target.value) })} />
            </div>
            <div className="settings-tab-addcharacter-dialog-div">
                <label>Character AP:</label>
                <input type="number" value={newCharacter.ap} onChange={(e) => setNewCharacter({ ...newCharacter, ap: parseInt(e.target.value) })} />
            </div>
            <div className="settings-tab-addcharacter-dialog-div">
                <label>Character DP:</label>
                <input type="number" value={newCharacter.dp} onChange={(e) => setNewCharacter({ ...newCharacter, dp: parseInt(e.target.value) })} />
            </div>
        </Dialog>
    )
}

type AreYouSureDialogProps = {
    displayModal: boolean;
    setDisplayModal: Dispatch<SetStateAction<boolean>>;
    dialogFooter: React.ReactNode;
    onYesClick: () => void; // callback for "Yes" button
    onNoClick: () => void;  // callback for "No" button
}



function AreYouSureDialog({ displayModal, setDisplayModal, dialogFooter, onYesClick, onNoClick }: AreYouSureDialogProps) {
    return (
        <Dialog
            visible={displayModal}
            draggable={false}
            style={{ width: '50vw' }}
            onHide={() => setDisplayModal(false)}
            header="Are you sure you want to delete this character?"
        >
            <div>
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'row-reverse',
                    marginRight: '10px'
                }}>
                    <button className="settings-tab-ays no" onClick={onNoClick}>No</button>
                    <button className="settings-tab-ays yes" onClick={onYesClick}>Yes</button>
                </div>
            </div>
        </Dialog>
    );
}


function SettingsTab() {
    const dispatch = useAppDispatch();
    const characters = useSelector(getCharacters);

    const [newCharacter, setNewCharacter] = useState(SettingsCharacterDefault);

    const [displayModal, setDisplayModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const handleAdd = () => {
        dispatch(addCharacter(newCharacter))
        setNewCharacter(SettingsCharacterDefault);
        setDisplayModal(false);
    };

    const dialogFooter = (
        <div>
            <button className="settings-tab-ays yes" style={{
                marginRight: '20px'
            }} onClick={handleAdd}>Add</button>
            <button className="settings-tab-ays no" onClick={() => {
                setDisplayModal(false)
                setNewCharacter(SettingsCharacterDefault);
            }}>Cancel</button>
        </div>
    );


    const handleDelete = (options: ColumnBodyOptions) => {
        setDeleteIndex(options.rowIndex);
        setDeleteConfirmation(true);
    };

    const handleYesDelete = () => {
        if (deleteIndex !== null) {
            dispatch(removeCharacter(characters[deleteIndex].name));            
        }
        setDeleteConfirmation(false);
        setDeleteIndex(null);
    };

    const handleNoDelete = () => {
        setDeleteConfirmation(false);
        setDeleteIndex(null);
    };

    function DeleteButton({ options }: { options: ColumnBodyOptions }) {
        return <button onClick={() => handleDelete(options)} className="delete-character-button">Delete</button>
    }

    return (
        <div className="settings-tab-container">
            <div className="settings-tab-character-details">
                <div className="settings-tab-character-details-header">
                    <h1>Character Details</h1>
                    <p>Your Black Desert Online Character Defaults.</p>
                    <div className="settings-tab-add-character" style={{
                        marginTop: 30
                    }}>
                        <button className="settings-tab-addcharacter-button" onClick={() => setDisplayModal(true)} >Add New Character</button>
                        <AddCharacterDialog displayModal={displayModal} setDisplayModal={setDisplayModal} newCharacter={newCharacter} setNewCharacter={setNewCharacter} dialogFooter={dialogFooter} />
                        <AreYouSureDialog
                            displayModal={deleteConfirmation}
                            setDisplayModal={setDeleteConfirmation}
                            dialogFooter={null}
                            onYesClick={handleYesDelete}
                            onNoClick={handleNoDelete}
                        />
                    </div>
                </div>
                <div className="settings-tab-character-details-table">
                    <DataTable value={characters} tableStyle={{ minWidth: '50.5rem' }}>
                        <Column field="name" header="Character Name" />
                        <Column field="class" header="Character Class" />
                        <Column field="level" header="Character Level" />
                        <Column field="ap" header="Character AP" />
                        <Column field="dp" header="Character DP" />
                        <Column header="Delete" body={(_, options) => <DeleteButton options={options} />} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default SettingsTab;
