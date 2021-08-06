
//MY APPLICATION'S STATE MODEL
export interface IAppState {
    currentUser: IUser | null;
    postList: IPost[] | null;
}

//SUPPORTING STATE MODELS
export interface IUser{
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    user_username: string;
    user_phone: string;
    user_email: string;
    user_registered_date: string;
    userProfileImage: string;

}

export interface IPost{
    postId: number;
    postContent: number;
    postImage: string;
    postUser: IUser;
    timeCreated: Date;
}

/////////INITIAL STATE, this is the beginning state we'll give to the reducer upon startup
export const initialState: IAppState = {
    currentUser: null,
    postList: null
}