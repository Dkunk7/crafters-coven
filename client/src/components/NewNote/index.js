import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

function NewNote() {
    const [formData, setFormData] = useState({
        title: "",
        noteContent: "",
        // do I include isCoordinate?
    });

    const [addNote, { error }] = useMutation(ADD_NOTE, { // Loosely referenced from regular-warehouse
        update(cache, { data: { addNote } }) { // Note sure if/how this will work
            try {
                const { notes } = cache.readQuery({ query: QUERY_NOTES });
                cache.writeQuery({
                    query: QUERY_NOTES,
                    data: { notes: [addNote, ...notes] }
                });
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleChange = (event) => {

    };

    const handleFormSubmit = async (event) => {

    };

    return (
        <div>

        </div>
    );
}

export default NewNote;