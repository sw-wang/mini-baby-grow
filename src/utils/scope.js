// scope.userInfo	wx.getUserInfo	用户信息
// scope.userLocation	wx.getLocation, wx.chooseLocation	地理位置
// scope.userLocationBackground	wx.startLocationUpdateBackground	后台定位
// scope.address	wx.chooseAddress	通讯地址
// scope.invoiceTitle	wx.chooseInvoiceTitle	发票抬头
// scope.invoice	wx.chooseInvoice	获取发票
// scope.werun	wx.getWeRunData	微信运动步数
// scope.record	wx.startRecord	录音功能
// scope.writePhotosAlbum	wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
// scope.camera	camera 组件	摄像头
export default scope => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (!res.authSetting[scope]) {
                    wx.authorize({
                        scope,
                        success() {
                            resolve()
                        },
                        fail(e) {
                            reject()
                        }
                    })
                } else {
                    resolve()
                }
            }
        })
    })
}
