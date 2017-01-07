#include <iostream>
#include <string>
using namespace std;

int main () {

  // Read cin line by line
  string line;
  while(getline(cin, ine)) {
    cout << line << endl;
  }

  int gcd (int a, int b) {
    while (a != b) {
      if (a > b) {
        a -= b;
      } else {
        b -= a;
      }
    }
    return a;
  }

  int gcd (int x, int y) {
    if (x == 0) {
      return y;
    } else {
      return gcd(y % x, x);
    }
  }

  int to_lower () {
    std::transform(s.begin(), s.end(), s.begin(), ::tolower);
  }



}