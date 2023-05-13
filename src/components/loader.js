const { default: Spinner } = require("react-native-loading-spinner-overlay/lib");

export function Loader({loading}){
    return (
        <Spinner
            visible={loading}
            textContent={'Please wait...'}
            textStyle={{
                color: '#FFF'
            }}
        />
    )
}