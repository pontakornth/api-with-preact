import style from "./Profile.module.css"
export type ProfileProps = {
    name: string;
    age: number;
    anime: string;
}

const Profile = ({name, age, anime}: ProfileProps) => {
    return (
        <div class={style.Profile}>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Anime: {anime}</p>
        </div>
    )
}

export default Profile
