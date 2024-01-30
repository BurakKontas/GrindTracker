import React, { Dispatch, SetStateAction, useState } from "react";
import "./global.css";
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const CharactersTableColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Class',
        dataIndex: 'class',
        key: 'class',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'AP',
        dataIndex: 'ap',
        key: 'ap',
    },
    {
        title: 'DP',
        dataIndex: 'dp',
        key: 'dp',
    },
];

type AddCharacterDialogProps = {
    displayModal: boolean;
    setDisplayModal: Dispatch<SetStateAction<boolean>>;
    newCharacter: Character;
    setNewCharacter: Dispatch<SetStateAction<Character>>;
    dialogFooter?: React.ReactNode;
};

type Character = {
    name: string;
    class: string;
    level: number;
    ap: number;
    dp: number;
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
                <input type="text" value={newCharacter.class} onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })} />
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
    const [characters, setCharacters] = useState([
        { name: "Character 1", class: "Class A", level: 50, ap: 150, dp: 200 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        { name: "Character 2", class: "Class B", level: 55, ap: 180, dp: 220 },
        //... existing characters
    ]);

    const [newCharacter, setNewCharacter] = useState({
        name: '',
        class: '',
        level: 0,
        ap: 0,
        dp: 0
    });

    const [displayModal, setDisplayModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const handleAdd = () => {
        setCharacters([...characters, newCharacter]);
        setNewCharacter({
            name: '',
            class: '',
            level: 0,
            ap: 0,
            dp: 0
        });
        setDisplayModal(false);
    };

    const dialogFooter = (
        <div>
            <button className="settings-tab-ays yes" style={{
                marginRight: '20px'
            }} onClick={handleAdd}>Add</button>
            <button className="settings-tab-ays no" onClick={() => {
                setDisplayModal(false)
                setNewCharacter({
                    name: '',
                    class: '',
                    level: 0,
                    ap: 0,
                    dp: 0
                });
            }}>Cancel</button>
        </div>
    );


    const handleDelete = (options: ColumnBodyOptions) => {
        setDeleteIndex(options.rowIndex);
        setDeleteConfirmation(true);
    };

    const handleYesDelete = () => {
        if (deleteIndex !== null) {
            const newCharacters = [...characters];
            newCharacters.splice(deleteIndex, 1);
            setCharacters(newCharacters);
        }
        setDeleteConfirmation(false);
        setDeleteIndex(null);
    };

    const handleNoDelete = () => {
        setDeleteConfirmation(false);
        setDeleteIndex(null);
    };

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
                    <DataTable value={characters} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Character Name" />
                        <Column field="class" header="Character Class" />
                        <Column field="level" header="Character Level" />
                        <Column field="ap" header="Character AP" />
                        <Column field="dp" header="Character DP" />
                        <Column header="Delete" body={(_, options) => <button onClick={() => handleDelete(options)} className="delete-character-button">Delete</button>} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default SettingsTab;
