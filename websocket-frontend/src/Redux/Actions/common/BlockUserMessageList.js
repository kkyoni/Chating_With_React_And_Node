import { message } from "antd";
import { BLOCK_USER_MESSAGE_LIST_ERROR, BLOCK_USER_MESSAGE_LIST_SUCCESS } from '../../Types/common/Types';
import { BlockUserMessageListApi } from "../../Apis/common/ApiConfig";

export const BlockUserMessageListSuccess = (res) => {
    return {
        type: BLOCK_USER_MESSAGE_LIST_SUCCESS,
        payload: res,
    };
};
export const BlockUserMessageListError = (error) => {
    return {
        type: BLOCK_USER_MESSAGE_LIST_ERROR,
        error: error,
    };
};

export const BlockUserMessageListActionHandler = (receiverId) => {
  return (dispatch) => {
    try {
      BlockUserMessageListApi(receiverId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(BlockUserMessageListSuccess(res.data));
            } else {
              message.error("This user is blocked");
              dispatch(BlockUserMessageListError(errorMessage));
            }
          } else {
            dispatch(BlockUserMessageListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(BlockUserMessageListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(BlockUserMessageListError(err));
    }
  };
};