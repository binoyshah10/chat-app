import React, { Component } from 'react';
import styles from './DropdownMenu.module.css';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default class DropdownMenu extends Component {
    state = {
        showMenu: false,
      };
      
    showMenu = (event) => {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    
    closeMenu = (event) => { 
        if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });  
        }
    }

    render() {
        return (
            <div>
                <div onClick={this.showMenu} className={styles.dropdownTitle}>
                        {this.props.buttonLabel}
                        <MdKeyboardArrowDown />
                </div>
            
                {
                    this.state.showMenu
                    ? (
                        <div
                            className={styles.menu}
                            style={{position: 'absolute', zIndex: 1}}
                            ref={(element) => {
                                this.dropdownMenu = element;
                            }}
                        >
                            {this.props.children}
                        </div>
                    )
                    : null
                }
            </div>
        )
    }
}
