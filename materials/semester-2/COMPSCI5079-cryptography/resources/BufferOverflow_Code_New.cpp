#include <cstring>
#include <iostream>

int main( void )
{
 int authentication = 0;
 char cUsername[ 10 ];
 char cPassword[ 10 ];

 std::cout << "Username: ";
 std::cin >> cUsername;

 std::cout << "Pass: ";
 std::cin >> cPassword;

 if( std::strcmp( cUsername, "admin" ) == 0 && std::strcmp( cPassword, "Nguyen" ) == 0 )
 {
  authentication = 1;
 }
 if( authentication )
 {
  std::cout << "Access granted\n";
 }
 else
 {
  std::cout << "Wrong username and password\n";
 }

 return ( 0 );
}