function setPrint() {
            const closePrint = () => {
                document.body.removeChild(this);
            };
            this.contentWindow.onbeforeunload = closePrint;
            this.contentWindow.onafterprint = closePrint;
            this.contentWindow.print();
        }

        document.getElementById("print_external").addEventListener("click", () => {
            const hideFrame = document.createElement("iframe");
            hideFrame.onload = setPrint;
            hideFrame.style.display = "none"; // hide iframe
            const ticketID = document.querySelector('.ticketID').innerText;
            hideFrame.src = `/tickets/${ticketID}/print`;

            document.body.appendChild(hideFrame);
        });