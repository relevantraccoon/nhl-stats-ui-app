import React from "react";

const Header = () => {
  return (
    <header id="header">
      <div id="header-heading-div">
        <h1>My NHL Statistics page</h1>
      </div>

      <form>
        <label>
          <h2>Season:</h2>
          <select id="season-year" name="season-year">
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
          </select>
        </label>

        <label>
          <h2>Season Type:</h2>
          <select id="season-type" name="season-type">
            <option value="regular-season">Regular season</option>
            <option value="playoffs">Playoffs</option>
          </select>
        </label>

        <label>
          <h2>Franchises:</h2>
          <select id="franchises" name="franchises">
            <option value="Anaheim Ducks">Anaheim Ducks</option>
            <option value="Arizona Coyotes">Arizona Coyotes</option>
            <option value="Seattle Kraken">Seattle Kraken</option>
          </select>
        </label>

        <input type="submit" value="Show stats" />
      </form>
    </header>
  );
};

export default Header;
