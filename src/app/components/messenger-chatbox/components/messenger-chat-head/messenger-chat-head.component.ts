import { AfterViewInit, Component } from "@angular/core";
import Swiper from "swiper";
import { chatHeadUser } from "../../model/messenger-chatbox.model";
import { MessengerChatboxService } from "../../services/messenger-chatbox.service";

@Component({
  selector: "app-messenger-chat-head",
  templateUrl: "./messenger-chat-head.component.html",
  styleUrls: ["./messenger-chat-head.component.scss"],
})
export class MessengerChatHeadComponent implements AfterViewInit {
  constructor(private messengerChatboxService: MessengerChatboxService) {}

  chatHeadSwiper: Swiper;
  private holdTimeoutId?: number;

  users: chatHeadUser[] = [
    { id: 1, profilePicture: "assets/images/user1.png" },
    { id: 2, profilePicture: "assets/images/user2.png" },
    { id: 3, profilePicture: "assets/images/user3.png" },
    { id: 4, profilePicture: "assets/images/user4.png" },
    { id: 5, profilePicture: "assets/images/user1.png" },
    { id: 6, profilePicture: "assets/images/user2.png" },
    { id: 7, profilePicture: "assets/images/user3.png" },
    { id: 8, profilePicture: "assets/images/user4.png" },
  ];
  selectedUser: chatHeadUser = this.users[2];

  ngAfterViewInit(): void {
    setTimeout(() => {
      // initialize chat swiper with config
      this.chatHeadSwiper = new Swiper(".swiper-container", {
        slideToClickedSlide: true,
        slideActiveClass: "selected-slide",
        initialSlide: 2,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 5,
        loop: true,
        loopAdditionalSlides: 3,
        on: {
          // set index of service when slide change
          slideChange: () => {
            let activeIndex = this.chatHeadSwiper?.realIndex;
            if (this.chatHeadSwiper?.params.loop) {
              // Adjust the active index for looped slides
              activeIndex = this.chatHeadSwiper?.activeIndex;
            }
            this.messengerChatboxService.setSelectedSlideIndex(activeIndex);
            this.selectedUser = this.users[activeIndex];
          },
        },
      });
      console.log(this.chatHeadSwiper);
    }, 100);

    // subscribe to change slide observable
    this.messengerChatboxService.selectedSlideIndex$.subscribe((index) => {
      this.chatHeadSwiper?.slideTo(index);
      this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
    });
  }

  // on select chathead user
  selectUser(user: chatHeadUser) {
    this.selectedUser = user;
  }

  // return percentage
  getPercentage(i: number) {
    return Math.floor((i + 1) * (100 / this.users.length));
  }

  startHold(event: MouseEvent): void {    
    // Clear any existing timeout to prevent multiple triggers
    if (this.holdTimeoutId) {
      clearTimeout(this.holdTimeoutId);
    }

    // Set a new timeout for 1.5 seconds (1500 milliseconds)
    this.holdTimeoutId = window.setTimeout(() => {      
      alert("You are holding my header");
      this.holdTimeoutId = undefined;      
    }, 1500);
  }

  cancelHold(): void {
    console.log("canceling timer");
    // Clear the timeout if the mouse is released or leaves the div
    if (this.holdTimeoutId) {
      clearTimeout(this.holdTimeoutId);
      this.holdTimeoutId = undefined;
    }
  }
}
