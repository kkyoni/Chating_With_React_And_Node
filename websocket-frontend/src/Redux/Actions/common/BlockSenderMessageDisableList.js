import { BLOCK_SENDER_MESSAGE_DISABLE_LIST_ERROR, BLOCK_SENDER_MESSAGE_DISABLE_LIST_SUCCESS } from '../../Types/common/Types';
import { BlockSenderMessageDisableListApi } from "../../Apis/common/ApiConfig";

export const BlockSenderMessageDisableListSuccess = (res) => {
    return {
        type: BLOCK_SENDER_MESSAGE_DISABLE_LIST_SUCCESS,
        payload: res,
    };
};
export const BlockSenderMessageDisableListError = (error) => {
    return {
        type: BLOCK_SENDER_MESSAGE_DISABLE_LIST_ERROR,
        error: error,
    };
};

export const BlockSenderMessageDisableListActionHandler = (receiverId) => {
  return (dispatch) => {
    try {
      BlockSenderMessageDisableListApi(receiverId)
        .then((res) => {
          const errorMessage = res?.message;
          if (res) {
            if (res && res.data && res.status === 'success') {
              dispatch(BlockSenderMessageDisableListSuccess(res.data));
            } else {
              dispatch(BlockSenderMessageDisableListError(errorMessage));
            }
          } else {
            dispatch(BlockSenderMessageDisableListError(errorMessage));
          }
        })
        .catch((err) => {
          dispatch(BlockSenderMessageDisableListError("Something Went Wrong!!!"));
        });
    } catch (err) {
      dispatch(BlockSenderMessageDisableListError(err));
    }
  };
};