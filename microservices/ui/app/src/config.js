import EditIcon from "./../assets/edit.svg";
import LeftAngleIcons from "./../assets/left-angle-bracket.svg"
import LikeIcon from "./../assets/like.svg"
import NopeIcon from "./../assets/nope.svg"
import SettingIcon from "./../assets/setting.svg"
import LogoIcon from "./../assets/logo.jpg"
import LogoCropIcon from "./../assets/logocrop.png"
import LikeUserIcon from "./../assets/like_user.svg"

//now no need to  react refrence becoz here we use jsx element and need a React reference at compile time to make an element using  React.creatElement
//you may hardcoded the clustername but alternative and best is i think.
//if your hostname is ui.cluster-name.hasura-app.io then cluste name can be get using this.
const clusterName = window.location.hostname.split('.')[1];
export let config = {
    url:{
          file:"https://filestore."+clusterName+".hasura-app.io/v1/file",
          data:"https://data."+clusterName+".hasura-app.io/v1/query",
          logout:"https://auth."+clusterName+".hasura-app.io/v1/user/logout",
          delete_user:"https://api."+clusterName+".hasura-app.io/delete",
          insert_user:"https://api."+clusterName+".hasura-app.io/insert-user",
          update_user:"https://api."+clusterName+".hasura-app.io/update-user",
          like_users:"https://api."+clusterName+".hasura-app.io/like-users",
          like:"https://api."+clusterName+".hasura-app.io/like",
          nope:"https://api."+clusterName+".hasura-app.io/nope",
          user_info:"https://auth."+clusterName+".hasura-app.io/v1/user/info",
          login: "https://auth."+clusterName+".hasura-app.io/v1/login",
          signup:"https://auth."+clusterName+".hasura-app.io/v1/signup",
          getUsersInfo: "https://api."+clusterName+".hasura-app.io/get-allusers-info",
        },
  icons:{
            edit:EditIcon,
            setting:SettingIcon,
            likeUserIcon:LikeUserIcon,
            nopeIcon:NopeIcon,
            likeIcon:LikeIcon,
            backIcon:LeftAngleIcons,
            tinder:LogoIcon,
            tinderNameLogo: LogoCropIcon,

        }
  };
