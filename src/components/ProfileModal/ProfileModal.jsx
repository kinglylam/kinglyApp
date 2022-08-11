import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileimage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.autData);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileimage(img)
        : setCoverImage(img);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profileImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id, Userdata));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={changeHandler}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={changeHandler}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={changeHandler}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={changeHandler}
            value={formData.livesIn}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={changeHandler}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="Relationship status"
            onChange={changeHandler}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={imageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={imageChange} />
        </div>
        <button
          style={{ width: "8rem" }}
          className="button info-button"
          onClick={submitHandler}
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
