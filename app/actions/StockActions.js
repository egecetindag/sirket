import * as s from '../services/StockServices'
import axios from 'axios'
import * as t from './types'

export const retrieveStocks = (obj) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: t.RETRIEVE_STOCKS_REQUEST,
            })
            let response = await dispatch(()=>s.retrieveStocksService(obj));
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_STOCKS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_STOCKS_FAILURE
            })
        }

    }
}
export const retrieveStocksCategories = () => {
    return async (dispatch) => {
        try{
            dispatch({
                type: t.RETRIEVE_STOCKS_CATEGORIES_REQUEST,
              })
        let response = await dispatch(()=>s.retrieveStocksCategoriesService());
        if (response.status === 200) {
          dispatch({
            type: t.RETRIEVE_STOCKS_CATEGORIES_SUCCESS,
            payload: response.data
          })
        } else {
          throw Error
        }
      }
      catch (error) {
        dispatch({
          type: t.RETRIEVE_STOCKS_CATEGORIES_FAILURE
        })
      }
  
    }
  }
  export const deleteStockForSingleItem = () => {
    return async (dispatch) => {
      dispatch({
        type: t.DELETE_STOCK_FOR_ITEM_SUCCESS,
      })

    }
  }

  export const retrieveStockForSingleItem = (str) => {
    return async (dispatch) => {
      try {

        let response = await dispatch(()=>s.retrieveStockByBarcodeService(str));
        if (response.status === 200) {
          dispatch({
            type: t.RETRIEVE_STOCK_FOR_ITEM_SUCCESS,
            payload: response.data
          })
        } else {
          throw Error
        }
      }
      catch (error) {
        console.log('error', error)
        dispatch({
          type: t.RETRIEVE_STOCK_FOR_ITEM_FAILURE
        })
      }
  
    }
  }

export const retrieveStockByBarcode = (str) => {
  return async (dispatch) => {
    try {
        dispatch({
            type: t.RETRIEVE_STOCK_BY_BARCODE_REQUEST,
          })
      let response = await dispatch(()=>s.retrieveStockByBarcodeService(str));
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_STOCK_BY_BARCODE_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_STOCK_BY_BARCODE_FAILURE
      })
    }

  }
}
export const createStock = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_STOCKS_SUCCESS,
                    payload: response.data
                });
                dispatch(retrieveStocks({name:str}));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_STOCKS_FAILURE
            })
        }

    }
}

export const setFavoriteProduct = (productId,isFavorite,searchText) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.setFavoriteProduct(productId,isFavorite))
      if (response.status === 200) {
        dispatch({
          type: t.SET_FAVORITE_PRODUCT_SUCCESS,
          payload: response.data
        });
        dispatch(retrieveStocks({name:searchText}));
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.SET_FAVORITE_PRODUCT_FAILURE
      })
    }

  }
}

export const updateStock = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_STOCKS_SUCCESS
                });
                dispatch(retrieveStocks({name:str}));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error);
            dispatch({
                type: t.EDIT_STOCKS_FAILURE
            })
        }

    }
}

export const deleteStock = (id,str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.deleteStockService(id))
      if (response.status === 200) {
        dispatch({
          type: t.DELETE_STOCKS_SUCCESS
        });
        dispatch(retrieveStocks({name: str}));
      } else {
        throw Error
      }
    }
    catch (error) {
      dispatch({
        type: t.DELETE_STOCKS_FAILURE
      })
    }

  }
}
