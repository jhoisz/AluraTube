import { StyledRegisterVideo } from "./styles"
import React from "react";


function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name
            console.log(evento.target.name)
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

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = useForm({ initialValues: { titulo: "", url: "" } });

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
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                    : false
            }
        </StyledRegisterVideo>
    )
}