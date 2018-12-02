

import * as s from '../services/SaleServices'
import * as t from './types' 

export const finishSale = (basket) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.finishSaleService(basket))
            if (response.status === 200) {
                dispatch({
                    type: t.FINISH_SALE_SUCCESS,
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.FINISH_SALE_FAILURE
            })
        }

    }
}
