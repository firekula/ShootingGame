import { _decorator, Component, Node, Vec2, EventTouch, v3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MoveTouch")
export class MoveTouch extends Component {
	@property(Node)
	private joystick: Node = null!;
	@property(Node)
	private head: Node = null!;

	private startPosition: Vec2 = null!;
	private nowVector: Vec2 = null!;

	protected onLoad() {
		this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
		this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
		this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
	}

	protected onDestroy() {
		this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
		this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
		this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
	}

	private onTouchStart(event: EventTouch) {
		if (event.getAllTouches().length != 1) return;
		this.startPosition = event.getUILocation();
		this.joystick.position = v3(this.startPosition.x, this.startPosition.y, 0);
	}

	private onTouchMove(event: EventTouch) {
		if (event.getAllTouches().length != 1) return;
		this.nowVector = event.getUILocation().subtract(this.startPosition);
		this.head.position = v3(this.nowVector.x, this.nowVector.y, 0);
	}

	private onTouchCancel(event: EventTouch) {
		if (event.getAllTouches().length != 1) return;
	}

	private onTouchEnd(event: EventTouch) {
		if (event.getAllTouches().length != 1) return;
	}
}
