export const imageConfig = {
    outerHeight:400,
    outerWidth:400,
    innerHeight:200,
    innerWidth:200
}
/**
 * 获取鼠标在滑块在容器内移动范围
 */
export function getMoveInRange(){
    return {
        //滑块相对于容器可滑动的水平方向位置范围
        moveLeftX:imageConfig.innerWidth/2,
        moveRightX:imageConfig.outerWidth - imageConfig.innerWidth/2,
        //滑块相对于容器可滑动的垂直方向位置范围
        moveTopY:imageConfig.innerHeight/2,
        moveBottomY:imageConfig.outerHeight - imageConfig.innerHeight/2,
        //滑块最左位置
        leftX:0,
        //滑块最右位置
        rightX:imageConfig.outerWidth - imageConfig.innerWidth,
        //滑块最顶部位置
        topY:0,
        //滑块最底部位置
        bottomY:imageConfig.outerHeight - imageConfig.innerHeight
    }
}