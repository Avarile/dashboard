import { Input } from "antd"
import "antd/dist/antd.css"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { useDispatch } from "react-redux"
import { setProducts } from "@DATA/dataSlices/products.slice"
import { setError } from "@DATA/dataSlices/isloading.slice"

const { Search } = Input
const env = envSwitch("dev")
const SearchBar = ({ placeHolder, style }: { placeHolder: string; style: Object }) => {
  const dispatch = useDispatch()
  const onSearch = async (value: string) => {
    await Request.get(`${env.dbUri}/products?sku=${value}`)
      .then((response: any) => {
        dispatch(setProducts(response))
      })
      .catch((error: any) => {
        dispatch(setError(error))
      })
  }

  return <Search placeholder={placeHolder} allowClear onSearch={onSearch} enterButton="search" style={style} />
}

export default SearchBar
