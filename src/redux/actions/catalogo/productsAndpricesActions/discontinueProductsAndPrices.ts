import axios from '../../../../configs/axios';
import {
  DISCONTINUE_PRODUCTSANDPRICES,
  PRODUCTSANDPRICES_FAILURE,
  PRODUCTSANDPRICES_REQUEST,
} from './actionTypes';
import { PRODUCTS_PATH } from '../../../../lib/path.lib';

export function discontinueProductsAndPricesAction(id, body) {
  return async (dispatch) => {
    dispatch({ type: PRODUCTSANDPRICES_REQUEST });
    const bodyValue = body === 'enabled' ? 'disabled' : 'enabled';
    const solicitud = { status: bodyValue };
    try {
      const response = await axios.put(`${PRODUCTS_PATH}/${id}`, solicitud);
      if (!response.data) {
        dispatch({
          type: PRODUCTSANDPRICES_FAILURE,
          error: 'Respuesta inesperada del servidor',
        });
        throw new Error(
          'Ha ocurrido algo inesperado, la respuesta no contiene datos',
        );
      }
      dispatch({ type: DISCONTINUE_PRODUCTSANDPRICES, payload: response.data });
    } catch (error) {
      dispatch({
        type: PRODUCTSANDPRICES_FAILURE,
        error: 'Respuesta inesperada del servidor',
      });
      throw new Error(`Ha ocurrido un error inesperado ${error}`);
    }
  };
}
