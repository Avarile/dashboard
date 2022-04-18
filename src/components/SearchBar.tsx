import { Input } from "antd"
import "antd/dist/antd.css"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "@DATA/dataSlices/products.slice"
import { setError, setIsloading, selectIsloading } from "@DATA/dataSlices/isloading.slice"

const { Search } = Input
const env = envSwitch("dev")
const SearchBar = ({ placeHolder, style }: { placeHolder: string; style: Object }) => {
  const dispatch = useDispatch()
  const values = useSelector(selectIsloading).isloading.isloading
  console.log(values)

  const onSearch = async (value: string) => {
    dispatch(setIsloading(true))
    setTimeout(async () => {
      await Request.get(`${env.dbUri}/products?sku=${value}`)
        .then((response: any) => {
          dispatch(setProducts(response))
        })
        .catch((error: any) => {
          dispatch(setError(error))
        })
        .finally(() => {
          dispatch(setIsloading(false))
        })
    }, 1500)
  }

  return <Search disabled={values} loading={values} placeholder={placeHolder} allowClear onSearch={onSearch} enterButton="search" style={style} />
}

export default SearchBar
