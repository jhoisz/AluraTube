import { StyledRegisterVideo } from "./styles"
import React from "react";
import { createClient } from '@supabase/supabase-js'


function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name
            console.log(evento.target.value)
            setValues({
                ...values,
                [name]: value
            })
        },

        clearForm() {
            setValues({})
        }
    };
}
const PROJECT_URL = "https://fceyngstazufwdqnakmm.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZXluZ3N0YXp1ZndkcW5ha21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDM4NDcsImV4cCI6MTk4MzY3OTg0N30.C-e1Y1Ol7sbL5YVL3XpTbCgttrtnQDYx-Po8hm6elJc"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


// get youtube video id
function getThumbnail(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        return "https://img.youtube.com/vi/" + videoId.substring(0, ampersandPosition) + "/hqdefault.jpg";
    }
    return "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = useForm({ initialValues: { titulo: "", url: "", playlist: "" } });

    // console.log()

    return (
        <StyledRegisterVideo>
            <button
                className="add-video"
                onClick={() => { setFormVisivel(true) }}>+
            </button>
            {
                formVisivel ?
                    <form onSubmit={(evento) => {
                        evento.preventDefault()
                        const thumb = getThumbnail(formCadastro.values.url)

                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: thumb,
                            playlist: formCadastro.values.playlist
                        }).then(
                            (e) => {
                                console.log(e)
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                            }
                        )


                        setFormVisivel(false)
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => { setFormVisivel(false) }}>
                                X
                            </button>
                            <input
                                placeholder="Título do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={
                                    formCadastro.handleChange
                                }
                            ></input>
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={
                                    formCadastro.handleChange
                                }
                            ></input>
                            <input
                                placeholder="Playlist"
                                name="playlist"
                                value={formCadastro.values.playlist}
                                onChange={
                                    formCadastro.handleChange
                                }
                            ></input>
                            <button type="submit">Cadastrar</button>


                        </div>
                    </form>
                    : false
            }
        </StyledRegisterVideo>
    )
}